import React from "react";
import { render, screen } from "@testing-library/react";

import DesertFunCreateDialogComponent from "../DesertFunCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders desertFun create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DesertFunCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("desertFun-create-dialog-component")).toBeInTheDocument();
});
