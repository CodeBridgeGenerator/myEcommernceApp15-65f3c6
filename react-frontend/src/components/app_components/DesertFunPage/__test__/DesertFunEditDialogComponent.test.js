import React from "react";
import { render, screen } from "@testing-library/react";

import DesertFunEditDialogComponent from "../DesertFunEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders desertFun edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DesertFunEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("desertFun-edit-dialog-component")).toBeInTheDocument();
});
