package main

import "fmt"

type user struct {
	Name     string
	password string
}

type Person interface{}

func getDaniel() Person {
	return user{
		Name:     "daniel",
		password: "super secure",
	}
}

func main() {

	var daniel Person = getDaniel()

	fmt.Printf("\n\n%T\n\n", daniel)
	switch daniel.(type) {
	case user:
		print("Daniel is an instance of user")
	default:
		print("daniel is not an instance of user")
	}
}
