import { useEffect, useState } from "react";
import { Row, Col, Layout, Form, Input, Pagination, Button } from "antd";
import MovieCard from "./MovieCard";
import "../styles/App.css";
import ModalAddComment from "./ModalAddComment";

const { Header, Footer, Content } = Layout;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      if (searchValue) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=34fa235a&s=${searchValue}&page=${currentPage}`
        );
        const moviesArray = await response.json();
        console.log("moviesArray", moviesArray);
        setMovies(moviesArray.Search);
        setTotalResults(moviesArray.totalResults);
      }
    };

    getMovies();
  }, [searchValue, currentPage]);

  const handleSearch = (values) => {
    console.log("values", values);
    setSearchValue(values.search);
    setCurrentPage(1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    setCurrentPage(page);
  };

  const handleAddComment = (comment) => {
    console.log("Add comment", currentMovie, comment);
    const newMovies = [...movies];
    const movieToAddComment = newMovies[currentMovie];
    const newComment = {
      text: comment,
      createdAt: new Date(),
      user: "Chalo",
    };
    if (movieToAddComment.comments) {
      movieToAddComment.comments.push(newComment);
    } else {
      movieToAddComment.comments = [newComment];
    }

    setMovies(newMovies);
  };

  const handleShowCommentForm = (index) => {
    setCurrentMovie(index);
  };

  const handleCloseCommentForm = () => {
    setCurrentMovie(null);
  };

  console.log("currentMovie", currentMovie);
  console.log("movies", movies);

  return (
    <Layout>
      <Header>Películas</Header>
      <Content className="main-content">
        <Row>
          <Col>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleSearch}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Buscar"
                name="search"
                rules={[
                  {
                    required: true,
                    message: "Ingresa el criterio de búsqueda",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Buscar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        {!searchValue && (
          <Row>
            <Col>
              Ingrese el título de una película para realizar a búsqueda
            </Col>
          </Row>
        )}

        {totalResults > 0 && (
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={totalResults}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        )}

        <Row justify="space-between">
          {movies.map((movie, index) => (
            <Col key={`${movie.imdbID}-${index}`}>
              <MovieCard
                movie={movie}
                onShowCommentForm={() => handleShowCommentForm(index)}
              />
            </Col>
          ))}
        </Row>

        {totalResults > 0 && (
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={totalResults}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        )}

        <ModalAddComment
          onAddComment={handleAddComment}
          visible={currentMovie !== null}
          onClose={handleCloseCommentForm}
        />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
