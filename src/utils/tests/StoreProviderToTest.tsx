import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { store } from "@/store";

export function renderWithProviders<TRProps extends object>(
  ui: React.ReactNode,
  renderOptions?: RenderOptions<TRProps>,
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
