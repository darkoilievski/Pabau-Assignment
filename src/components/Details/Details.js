/* eslint-disable react/prop-types */
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useQuery, gql } from '@apollo/client';
import './Details.css';
import menu from '../assests/menu-sharp.svg';

const GET_LOCATIONS = gql`
  {
    launchesPast(limit: 10) {
      rocket {
        rocket_name
        rocket_type
      }
      ships {
        name
        home_port
        image
      }
      mission_name
      links {
        flickr_images
        article_link
      }
      id
      details
    }
  }
`;

const Details = (props) => {
  const [showHidebar, setShowHidebar] = useState(false);
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p>Loading 🔍</p>;
  if (error) return <p>Error :(</p>;

  // Display the clicked rocket details
  // eslint-disable-next-line react/prop-types
  const show = data.launchesPast.filter((image) => image.id === props.state);

  // Click handlers
  const menuHandler = () => {
    setShowHidebar(true);
  };
  const closeSidebar = () => {
    setShowHidebar(false);
  };

  return show.map((detail) => {
    console.log(detail);
    return (
      <main key={detail.id} className="details-wrapper">
        <button className="details-btn" onClick={props.click}>
          👈 Go back and check out another rocket
        </button>
        <div key={detail.id} className="details-container">
          <p className="name">Name: {detail.rocket.rocket_name}</p>
          <p className="type">Type: {detail.rocket.rocket_type}</p>
          <p className="description">
            <strong>Mission details:</strong> {detail.details}
          </p>
          <section className="ship-wrapper">
            {detail.ships.map((ship) => {
              return (
                <div key={ship.id} className="single-ship">
                  <img src={ship.image} alt="..." className="ship-image" />
                  <p className="ship-name">
                    <strong>Ship name:</strong> {ship.name}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
        <img src={menu} alt="menu" className="menu-svg" onClick={menuHandler} />
        {showHidebar && <Sidebar click={closeSidebar} />}
      </main>
    );
  });
};
export default Details;
