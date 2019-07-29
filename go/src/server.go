package main

import (
	"fmt"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type Person struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Question struct {
	ID      uint   `json:"id"`
	Ques    string `json:"ques"`
	Option1 string `json:"o1"`
	Option2 string `json:"o2"`
	Option3 string `json:"o3"`
	Opt1    bool   `json:"o1b"`
	Opt2    bool   `json:"o2b"`
	Opt3    bool   `json:"o3b"`
	Qid     int    `sql:"type:bigint REFERENCES quizzes(ID) ON DELETE CASCADE ON UPDATE CASCADE" json:"qid"`
}

type Quiz struct {
	ID        uint       `json:"id"`
	Title     string     `json:"title"`
	Category  string     `json:"category"`
	Questions []Question `json:"question"`
}

type Score struct {
	ID    uint `json:"id"`
	Qid   int  `sql:"type:bigint REFERENCES quizzes(ID) ON DELETE CASCADE ON UPDATE CASCADE" json:"qid"`
	Pid   int  `sql:"type:bigint REFERENCES people(ID) ON DELETE CASCADE ON UPDATE CASCADE" json:"pid"`
	Score int  `json:"score"`
}

type Glob struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Score{})
	db.LogMode(true)
	db.Exec("PRAGMA foreign_keys = ON")
	r := gin.Default()
	r.POST("/login", Login)
	r.POST("/signup", Signup)
	r.GET("/viewpeople", ViewPerson)
	r.DELETE("/people/:id", DeletePerson)
	r.POST("/addquiz", AddQuiz)
	r.GET("/viewquiz", ViewQuiz)
	r.DELETE("/quiz/:id", DeleteQuiz)
	r.DELETE("/deleteques/:id", DeleteQuestion)
	r.GET("/viewpartquiz/:id", ViewPartquiz)
	r.GET("/viewscore", ViewScore)
	r.POST("/addquestion/:id", AddQuestion)
	r.PUT("/updateques/:id", UpdateQuestion)
	r.POST("/updatescore", AddScore)
	r.GET("/viewques/:id", ViewQuestion)
	r.Use((cors.Default()))
	r.Run(":8080")
}

func Signup(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	var per Person
	err := db.Where("username = ?", person.Username).First(&per).Error
	if err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error": "Username exists",
		})
	} else {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func Login(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	err := db.Find(&person, "username = ? AND password = ?", person.Username, person.Password).Error
	if err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error": "Invalid login",
		})
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person.ID)
	}
}

func ViewPerson(c *gin.Context) {
	var person []Person
	if err := db.Find(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, person)
	}
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func AddQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	var qu Quiz
	err := db.Where("username = ?", quiz.Title).First(&qu).Error
	if err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, gin.H{
			"error": "Username exists",
		})
	} else {
		db.Create(&quiz)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

func ViewQuiz(c *gin.Context) {
	var quiz []Quiz
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	d := db.Where("id = ?", id).Delete(&quiz)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func ViewPartquiz(c *gin.Context) {
	var question []Question
	id := c.Params.ByName("id")
	if err := db.Where("qid = ?", id).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func AddQuestion(c *gin.Context) {
	var question Question
	c.BindJSON(&question)
	id := c.Params.ByName("id")
	q, err := strconv.Atoi(id)
	if err == nil {
		question.Qid = q
		db.Create(&question)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	} else {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
}

func ViewQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	if err := db.Where("ID = ?", id).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", id).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func AddScore(c *gin.Context) {
	var score Score
	c.BindJSON(&score)
	fmt.Println(score)
	db.Create(&score)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, score)
}

func ViewScore(c *gin.Context) {
	var glob []Glob
	err := db.Table("scores").Select("people.id as id, people.username as username, sum(scores.score) as score").Joins("JOIN people ON people.id = scores.pid").Group("scores.pid").Find(&glob).Error
	if err != nil {
		fmt.Println(glob)
		c.AbortWithStatus(500)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, glob)
	}
}
