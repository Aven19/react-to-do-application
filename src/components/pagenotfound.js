import React from "react";
import "../App.css";

const PageNotFound = () => {
  return (
    <div>
      <section className="vh-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
                      404
                    </h1>
                    <div className="inline-block align-middle">
                      <h2 className="font-weight-normal lead" id="desc">
                        The page you requested was not found.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
