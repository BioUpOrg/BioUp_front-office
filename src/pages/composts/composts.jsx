import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
// import CompostCard from "../../components/cards/compostCard";
import { getComposts } from "../../services/compostService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./banner";
import { populateComposts } from "../../store/composts";
import TopRated from "./topRated";
import RecentlyAdded from "./recentlyAdded";
import TopSelled from "./topSelling";
import TopFilter from "./topFilter";
import SideFilter from "./sideFilter";

function Composts() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCompost();
  }, []);

  const getAllCompost = async () => {
    await getComposts().then((res) => dispatch(populateComposts(res)));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const composts = useSelector((state) => state.entities.composts.list);
  const itemsPerPage = 10;
  const totalItems = composts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = composts.slice(indexOfFirstItem, indexOfLastItem);

  // const renderCompostCards = currentItems.map((compost) => (
  //   <CompostCard key={compost._id} compost={compost} />
  // ));

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`page-item ${currentPage === number ? "active" : ""}`}
    >
      <a className="page-link" onClick={() => setCurrentPage(number)}>
        {number}
      </a>
    </li>
  ));

  return (
    <>
      <Banner />
      <section className="mt-50 mb-50">
        <div className="container mb-30">
          <div className="row flex-row-reverse">
            <div className="col-lg-4-5">
              <TopFilter />
              {/* <div className="row product-grid">{renderCompostCards}</div> */}
              <div class="pagination-area mt-15 mb-sm-5 mb-lg-0">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-start">
                    {renderPageNumbers}
                    {totalPages > 1 && (
                      <li className="page-item">
                        <a className="page-link">
                          <i className="fi-rs-angle-double-small-right"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                  <p>{`Showing ${
                    indexOfFirstItem + 1
                  } to ${indexOfLastItem} of ${totalItems}`}</p>
                </nav>
              </div>
            </div>
            <SideFilter/>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <Container>
          <Row>
            <RecentlyAdded />
            <TopRated />
            <TopSelled />
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Composts;
