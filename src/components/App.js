import { Layout } from "antd";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import TodosPage from "../pages/TodosPage";
import AboutPage from "../pages/AboutPage";
import MainMenu from "./MainMenu";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header className="main-header">
          <div className="logo">Películas</div>
          <MainMenu />
        </Header>

        <Content className="main-content">
          <Switch>
            <Route path="/acerca-de">
              <AboutPage />
            </Route>
            <Route path="/tareas">
              <TodosPage />
            </Route>
            <Route path="/netflix">
              <MoviesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
}

export default App;
