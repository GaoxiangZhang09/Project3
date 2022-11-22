import { nanoid } from "nanoid";
function NewCommuItem(props) {
  const listOfFriends = props.listOfFriends;
  const deleteFriend = props.deleteFriend;
  const updateFriend = props.updateFriend;
  return (
    <div>
      {/* {
          items.map((item)=>{
              // return <HomeHistoryItem key= {history.number} number={history.number} mintDate={history.mintDate} />
              // use 批量传递props 
              return <h1>Someone says:" {item}"</h1>
          })
        } */}
      {listOfFriends.map((val) => {
        return (
          <div key={nanoid()}>
            <div>
              {" "}
              {val.name} : {val.comment}
            </div>
            <button
              onClick={() => {
                updateFriend(val._id);
              }}
            >
              update message
            </button>
            <button
              onClick={() => {
                deleteFriend(val._id);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
NewCommuItem.propTypes = {};

export default NewCommuItem;
