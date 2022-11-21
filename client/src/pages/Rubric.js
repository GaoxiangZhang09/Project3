
import RubricImg from "../images/rebrics.png"

function Rubric() {
  return (
    <div>
      <h1>BPQ-331</h1>
      <div className="row">
        <div className="col-12">
          <p>
            Welcome to BPQ-331! <br/>
            This website/app is designed for customers who want to be the vip of BPQ331 <br/>
            restaurant customers who want to order online for dishes.
          </p>
        </div>
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
            src={RubricImg}
            alt="Nice nft mining website"
          />
          Picture from{""}
          <a href="../images/HomePageImg.jpeg">
            rd.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Rubric;