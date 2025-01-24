import {
  createSelector,
  createEntityAdapter,
  EntityState,
  EntityId,
} from "@reduxjs/toolkit";

import { apiSlice } from "@/store/features/api/api.slice";

import { UserI } from "@/types/user/user.model";

type LocalUser = Omit<UserI, "id"> & { id: EntityId };

const usersAdapter = createEntityAdapter<LocalUser>();
const initialState = usersAdapter.getInitialState();

export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<LocalUser, string>, void>({
      query: () => "/elements",
      transformResponse(res: LocalUser[]) {
        // Create a normalized state object containing all the user items
        return res;
      },
    }),
  }),
});

export const { useGetUsersQuery } = apiSliceWithUsers;

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select();
const selectUsersData = createSelector(
  selectUsersResult,
  // Fall back to the empty entity state if no response yet.
  (result) => result.data ?? initialState,
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(selectUsersData);
