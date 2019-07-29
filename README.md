## Following packages are used for gorm	

	"fmt"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"


## Following are the dependencies for ReactJS ( can be found in package.json file as well)
	{
  "name": "myapp",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "bootstrap": "4.1.3",
    "react": "^16.5.2",
    "react-bootstrap": "^0.32.4",
    "react-dom": "^16.5.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
 
## How to run
* Type yarn start to run the frontend JS
* Type go run server.go to run the backend server

## How to proceed
* If you want to login as admin, then username is 'admin' and password is 'pass'
* Admin can create,edit or delete any quiz
* You can register as user from signup page, and then play any quiz or check the leaderboard