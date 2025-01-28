import Header from '../../Header/Header';

const GameForm = () => {
  return (
    <>
      <Header text = "How many players are you playing with?" />
      <form>
        <label htmlFor="numPlayers">Number of Players:</label>
        <input type="number" id="numPlayers" name="numPlayers" min="1" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default GameForm