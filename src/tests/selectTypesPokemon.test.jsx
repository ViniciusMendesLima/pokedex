/* eslint-env jest */
/* global jest, describe, it, expect, beforeEach */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SelectTypesPokemon } from "../components/SelectTypesPokemon";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";

// Mock axios e hook
jest.mock("axios");
jest.mock("../services/usePokemonData", () => ({
  usePokemonData: jest.fn(),
}));

describe("SelectTypesPokemon", () => {
  const mockSearchTypes = jest.fn();

  const mochTheme = "light";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza os tipos e dispara onTypeSelected ao selecionar um tipo", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "normal", url: "..." },
          { name: "water", url: "..." },
          { name: "grass", url: "..." },
        ],
      },
    });

    render(
      <ThemeContext.Provider value={{ theme: mochTheme }}>
        <SelectTypesPokemon onTypeSelected={mockSearchTypes} />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("normal")).toBeInTheDocument();
      expect(screen.getByText("water")).toBeInTheDocument();
      expect(screen.getByText("grass")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "water" },
    });

    expect(mockSearchTypes).toHaveBeenCalledWith("water");
  });

  it("Verificar se o select é renderizado corretamente com o tema aplicado (light)", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [{ name: "fire" }],
      },
    });

    render(
      <ThemeContext.Provider value={{ theme: "light" }}>
        <SelectTypesPokemon onTypeSelected={() => {}} />
      </ThemeContext.Provider>
    );

    const selectElement = await screen.findByRole("combobox");

    expect(selectElement).toBeInTheDocument();

    expect(selectElement.className).toContain("light");
  });

  it("Mockar a resposta do axios.get e verificar se os <option> com os nomes dos tipos são renderizados corretamente, exceto shadow e unknown.", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "normal" },
          { name: "fighting" },
          { name: "flying" },
          { name: "poison" },
          { name: "ground" },
          { name: "rock" },
          { name: "bug" },
          { name: "ghost" },
          { name: "steel" },
          { name: "fire" },
          { name: "water" },
          { name: "grass" },
          { name: "electric" },
          { name: "psychic" },
          { name: "ice" },
          { name: "dragon" },
          { name: "dark" },
          { name: "fairy" },
          { name: "stellar" },
          { name: "shadow" },
          { name: "unknown" },
        ],
      },
    });

    render(
      <ThemeContext.Provider value={{ theme: mochTheme }}>
        <SelectTypesPokemon onTypeSelected={mockSearchTypes} />
      </ThemeContext.Provider>
    );

    await waitFor(async () => {
      const options = await screen.findAllByRole("option");
      expect(options).toHaveLength(20);
    });

    const expectedTypes = [
      "Todos",
      "normal",
      "fighting",
      "flying",
      "poison",
      "ground",
      "rock",
      "bug",
      "ghost",
      "steel",
      "fire",
      "water",
      "grass",
      "electric",
      "psychic",
      "ice",
      "dragon",
      "dark",
      "fairy",
      "stellar",
    ];

    const notExpcetedTypes = ["unknown", "shadow"];

    expectedTypes.forEach((type) => {
      expect(
        screen.getByRole("option", { name: new RegExp(type, "i") })
      ).toBeInTheDocument();
    });

    notExpcetedTypes.forEach((type) => {
      expect(
        screen.queryByRole("option", { name: new RegExp(type, "i") })
      ).not.toBeInTheDocument();
    });
  });

  it("Simular uma mudança no select e verificar se a função onTypeSelected foi chamada com o valor correto.", async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "normal" },
          { name: "fighting" },
          { name: "flying" },
          { name: "poison" },
          { name: "ground" },
          { name: "rock" },
        ],
      },
    });

    render(
      <ThemeContext.Provider value={{ theme: mochTheme }}>
        <SelectTypesPokemon onTypeSelected={mockSearchTypes} />
      </ThemeContext.Provider>
    );
    const elementChange = "fighting";
    await screen.findByRole("option", { name: elementChange });
    const selectElement = await screen.findByRole("combobox");

    fireEvent.change(selectElement, { target: { value: elementChange } });

    expect(mockSearchTypes).toHaveBeenCalledWith(elementChange);
    expect(mockSearchTypes).toHaveBeenCalledTimes(1);
  });

  it('Verificar se o select tem valor "Todos" ao ser renderizado.', async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          { name: "normal" },
          { name: "fighting" },
          { name: "flying" },
          { name: "poison" },
          { name: "ground" },
          { name: "rock" },
        ],
      },
    });

    render(
      <ThemeContext.Provider value={{ theme: mochTheme }}>
        <SelectTypesPokemon onTypeSelected={mockSearchTypes} />
      </ThemeContext.Provider>
    );

    const options = await screen.getAllByRole("option");
    expect(options).toHaveLength(1);

    expect(screen.getByRole("option", { name: /Todos/i })).toBeInTheDocument();
  });

  it("Simular um erro com axios.get e verificar se o erro foi tratado corretamente no console.error", async () => {
    const error = new Error("Erro ao buscar tipos");

    axios.get.mockRejectedValue(error);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ThemeContext.Provider value={{ theme: mochTheme }}>
        <SelectTypesPokemon onTypeSelected={mockSearchTypes} />
      </ThemeContext.Provider>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao buscar tipos:",
        error
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
