import { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment'
import './styles/styles.css';

const App = () => {
  const [query, setQuery] = useState('')
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('fuck')
    const response = await axios.get(`https://api.github.com/users/${query}`, {
      headers: {
        Authorization: process.env.REACT_APP_GITHUB_OAUTH_TOKEN
      }
    })

    if (response.data) {
      setUser(response.data)
    } else {
      setUser({})
    }
    setLoading(false)
  }

  console.log(user)

  return (
    <div className="mainContainer">
      <div className="">
        <div className="topBar">
          <div>devfinder</div>
          <div className="themeType">
            <span>LIGHT <i class="fas fa-sun"></i></span>
            {/* <span>DARK <i class="fas fa-moon"></i></span> */}
          </div>
        </div>
        <form className="searchBar" onSubmit={handleSearch}>
          <i class="fas fa-search"></i>
          <input placeholder="Search GitHub username..." onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form>

        <div className="mainCard">
          <div className="cardLeft">
            {loading ? (
              <div className="skeletonIcon" />
            ) : (
              <img src={user.avatar_url} alt={user.login} />
            )}
          </div>

          <div className="cardRight">
            <div className="topUserInfo">
              <div>
                {loading ? (
                  <div>
                    <div className="skeletonUsername" />
                    <div className="skeletonLogin" />
                  </div>
                ) : (
                  <div>
                    <div className="username">{user.name}</div>
                    <div className="login">@{user.login}</div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="skeletonDate" />
              ) : (
                <div>Joined {moment(user.created_at).format('D MMM YYYY')}</div>
              )}
            </div>

            {loading ? (
              <div className="skeletonBio" />
            ) : (
              <div>{user.bio || <span className="faded">This profile has no bio</span>}</div>
            )}

            

            {loading ? (
              <div className="userStats">
                <div className="skeletonStats" />
              </div>
            ) : (
              <div className="userStats">
                <div>
                  <div className="statDesc">Repos</div>
                  <div className="statNum">{user.public_repos}</div>
                </div>

                <div>
                  <div className="statDesc">Followers</div>
                  <div className="statNum">{user.followers}</div>
                </div>

                <div>
                  <div className="statDesc">Following</div>
                  <div className="statNum">{user.following}</div>
                </div>
              </div>
            )}

            <div className="bottomSection">
              <div className="bottomSectionInfo">
                <i className={`fas fa-map-marker-alt ${!user.blog ? 'faded' : ''}`}></i>
                <div>{user.location || <span className="faded">Not Available</span>}</div>
              </div>

              <div className="bottomSectionInfo">
                <i className={`fab fa-twitter ${!user.blog ? 'faded' : ''}`}></i>
                <div>{user.twitter_username || <span className="faded">Not Available</span>}</div>
              </div>

              <div className="bottomSectionInfo">
                <i className={`fas fa-link ${!user.blog ? 'faded' : ''}`}></i>
                <div>{user.blog || <span className="faded">Not Available</span>}</div>
              </div>

              <div className="bottomSectionInfo">
                <i className={`fas fa-building ${!user.blog ? 'faded' : ''}`}></i>
                <div>{user.company || <span className="faded">Not Available</span>}</div>
              </div>
            </div>

            

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
