function HomeMintResult(props) {
  return (
    <div>
      <h2>The minting result is: {props.number}</h2>
      <h2>The minting date is : {props.mintDate}</h2>
    </div>
  );
}

HomeMintResult.propTypes = {};

export default HomeMintResult;
