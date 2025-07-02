import "./App.css";
import { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./redux/reducers/newsSlice";
import NewsCard from "./components/ui/news-card/NewsCard";
import Avatar from "@mui/material/Avatar";

function App() {
  const dispatch = useDispatch();
  const { data: news, loading, error } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNews, setCurrentNews] = useState([]);

  const newsPerPage = 6;

  const handleRemove = (indexToRemove) => {
    console.log("INDEX", indexToRemove);
    const startIndex = (currentPage - 1) * newsPerPage;
    const nextIndex = startIndex + currentNews.length;

    const updated = [...currentNews];
    updated.splice(indexToRemove, 1);

    if (nextIndex < news.length) {
      updated.push(news[nextIndex]);
    }

    setCurrentNews(updated);
  };

  useEffect(() => {
    const start = (currentPage - 1) * newsPerPage;
    const pageNews = news.slice(start, start + newsPerPage);

    setCurrentNews(pageNews);
  }, [news, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;

  const showNewsPerPage = news.slice(indexOfFirstNews, indexOfLastNews);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR : {error}</div>;
  }

  return (
    <>
      <div className="newsPage_container">
        <aside>
          <div className="profile">
            <figure>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </figure>

            <article>
              <h1>Hi Reader</h1>
              <p>Here's your News</p>
            </article>
          </div>
          <section>
            <h1>View Toggle</h1>
            <input type="radio" name="" id="" />
          </section>
          <section>
            <h1>Have a Feedback</h1>
            <button>We're Listening</button>
          </section>
        </aside>
        <main>
          {currentNews.map((currNews, index) => {
            return (
              <NewsCard
                key={currNews.id}
                title={currNews.title}
                description={currNews.body}
                onRemove={() => handleRemove(index)}
              />
            );
          })}
          <div className="paginationBox">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(news.length / newsPerPage)}
                page={currentPage}
                color="primary"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
