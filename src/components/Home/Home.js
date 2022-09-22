/* eslint-disable react/prop-types */
import { useQuery, gql } from '@apollo/client';
import './Home.css';

const GET_LOCATIONS = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      links {
        flickr_images
      }
      id
    }
  }
`;

const Home = (props) => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p className="loading">Loading 🔍 ...</p>;
  if (error) return <p>Error :(</p>;

  // Display only the rocket's that have images using the filter method, because not all of them contain an image
  const result = data.launchesPast.filter((image) => image.links.flickr_images.length > 0);

  return result.map((item) => {
    return (
      <div path="/details" key={item.mission_name} className="card">
        <div className="image-container">
          <img
            src={item.links.flickr_images}
            alt="rocket"
            className="rocket-img"
            id={item.id}
            onClick={props.click}
          />
        </div>
        <div className="flex-bottom">
          <h3>Mission name:</h3>
          <p>{item.mission_name}</p>
        </div>
        <p className="em-description">
          <em>Click on the image above for more details about the rocket</em>
        </p>
      </div>
    );
  });
};

export default Home;
