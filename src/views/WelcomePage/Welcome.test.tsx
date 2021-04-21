import { screen, render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import { GameInfo } from "../../App"
import { WelcomePage } from "./WelcomePage"
jest.mock("axios")

beforeEach(() => {
  render(
    <WelcomePage
      setGameInfo={(gameInfo: GameInfo) => {
        expect(gameInfo.playerName).toBe(mockedPlayerName)
        expect(gameInfo.roomName).toBe(mockedRoomName)
      }}
    />
  )
})

const mockedPlayerName = "Player_AAA"
const mockedRoomName = "Room_Name"

describe("WelcomePage", () => {
  test("if it is possible to type in the player and room text fields", () => {
    typeTextboxesWithInfo()
  })
  test("if gameInfo is set when both fields are set and response from backend is valid", () => {
    setBackendResponse(true, true)
    typeTextboxesWithInfo()
    userEvent.click(screen.getByRole("button"))

    expect(
      screen.queryByText("Game has already started.")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Player name has already been taken.")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Room name cannot be empty.")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText("Player name cannot be empty.")
    ).not.toBeInTheDocument()
  })
  test("if roomName box gives error when response from backend is false", async () => {
    setBackendResponse(true, false)
    typeTextboxesWithInfo()
    userEvent.click(screen.getByRole("button"))
    await waitFor(() =>
      expect(
        screen.queryByText("Game has already started.")
      ).toBeInTheDocument()
    )
  })
  test("if playerName box gives error when response from backend is false", async () => {
    setBackendResponse(false, true)
    typeTextboxesWithInfo()
    userEvent.click(screen.getByRole("button"))
    await waitFor(() =>
      expect(
        screen.queryByText("Player name has already been taken.")
      ).toBeInTheDocument()
    )
  })
  test("if both text boxes gives error when backend sends both false", async () => {
    setBackendResponse(false, false)
    typeTextboxesWithInfo()
    userEvent.click(screen.getByRole("button"))

    await waitFor(() =>
      expect(
        screen.queryByText("Game has already started.")
      ).toBeInTheDocument()
    )

    await waitFor(() =>
      expect(
        screen.queryByText("Player name has already been taken.")
      ).toBeInTheDocument()
    )
  })
  test("if empty player name text field gives error", async () => {
    const [playerBox, roomBox] = screen.getAllByRole("textbox")
    userEvent.clear(playerBox)
    userEvent.type(roomBox, mockedPlayerName)
    userEvent.click(screen.getByRole("button"))
    await waitFor(() =>
      expect(
        screen.queryByText("Player name cannot be empty.")
      ).toBeInTheDocument()
    )
  })
  test("if empty room name text field gives error", async () => {
    const [playerBox, roomBox] = screen.getAllByRole("textbox")
    userEvent.clear(roomBox)
    userEvent.type(playerBox, mockedPlayerName)
    userEvent.click(screen.getByRole("button"))
    await waitFor(() =>
      expect(
        screen.queryByText("Room name cannot be empty.")
      ).toBeInTheDocument()
    )
  })
  test("if empty text fields gives errors", async () => {
    const [playerBox, roomBox] = screen.getAllByRole("textbox")
    userEvent.clear(roomBox)
    userEvent.clear(playerBox)
    userEvent.click(screen.getByRole("button"))

    await waitFor(() =>
      expect(
        screen.queryByText("Room name cannot be empty.")
      ).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(
        screen.queryByText("Player name cannot be empty.")
      ).toBeInTheDocument()
    )
  })
})

function setBackendResponse(
  playerNameAvailable: boolean,
  roomIsJoinable: boolean
) {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { playerNameAvailable, roomIsJoinable },
    })
  )
}

function typeTextboxesWithInfo() {
  const [playerBox, roomBox] = screen.getAllByRole("textbox")
  userEvent.clear(playerBox)
  userEvent.clear(roomBox)
  userEvent.type(playerBox, mockedPlayerName)
  userEvent.type(roomBox, mockedRoomName)

  expect(playerBox).toHaveValue(mockedPlayerName)
  expect(roomBox).toHaveValue(mockedRoomName)
}
