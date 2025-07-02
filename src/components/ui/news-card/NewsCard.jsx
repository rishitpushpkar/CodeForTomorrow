import "./NewsCard.css";
import newsImg_1 from "../../../assets/images/DSC07961-scaled-1-570x809-1-150x150.jpg";
import deleteIcon from "../../../assets/images/cross-small-svgrepo-com (1).svg";

export default function NewsCard({
  title,
  description,
  picture = newsImg_1,
  onRemove,
}) {
  const newDate = new Date().toUTCString();

  return (
    <div className="newsCard_container">
      <div className="newsCard">
        <figure>
          <img src={picture} alt={`${title} Picture`} />
        </figure>
        <article>
          <h1>{title}</h1>
          <p>{description}</p>
          <div>{newDate}</div>
        </article>
      </div>
      <button className="deleteCard_Button" onClick={onRemove}>
        <img src={deleteIcon} alt="Delete Icon" />
      </button>
    </div>
  );
}
