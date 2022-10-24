db = connect(XYZ)

db.habits.drop()

db.habits.insertMany([
    {
        username: "mcee", 
        password: "hdiwbhjdgewjbdxhjew", 
        habits: [
            {
                name: "Sleep",
                freq: "Daily",
                streak: 4
            }
        ]
    },
    {
        username: "amikaze", 
        password: "hdiwbhjdgewjbdxhjew", 
        habits: [
            {
                name: "Sleep",
                freq: "Daily",
                streak: 4
            }
        ]
    },
    {
        username: "gwoods", 
        password: "hdiwbhjdgewjbdxhjew", 
        habits: [
            {
                name: "Sleep",
                freq: "Daily",
                streak: 4
            }
        ]
    },
    {
        username: "tamtam", 
        password: "hdiwbhjdgewjbdxhjew", 
        habits: [
            {
                name: "Sleep",
                freq: "Daily",
                streak: 4
            }
        ]
    },
    {
        username: "gogan", 
        password: "hdiwbhjdgewjbdxhjew", 
        habits: [
            {
                name: "Sleep",
                freq: "Daily",
                streak: 4
            }
        ]
    },
])
