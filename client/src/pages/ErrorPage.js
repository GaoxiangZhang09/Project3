import PageNotFound404 from "../images/PageNotFound404.png";

function ErrorPage() {
  return (
    <div>
      <h1>Opps! Page not found!</h1>
      <div className="row">
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain"
            }}
            src={PageNotFound404}
            alt="Nice nft mining website"
          />
        </div>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
};

export default ErrorPage;