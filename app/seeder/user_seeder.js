/*
Seeder script to create a query to fill user table
Need to run the script and then ctr-c and ctr-v in query executer
 */

function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('');
};

var names = [
    "Dyan Eagles",
    "Selma Angelos",
    "Julie Ecton",
    "Karisa Tennyson",
    "Lakeshia Dunavant",
    "Nereida Schuch",
    "Ossie Boudreau",
    "Brandy Coles",
    "Elene Leet",
    "Estrella Sohn",
    "Sheryll Fanelli",
    "Cassi Thorson",
    "Aja Pinkley",
    "Roseanne Tezeno",
    "Wilbur Campione",
    "Theodora Gagnon",
    "Joy Echeverria",
    "Rico Glaude",
    "Adriene Randell",
    "Stephen Honea",
    "Wesley Peraza",
    "Vanna Lowder",
    "Shon Delamora",
    "Kathyrn Ortner",
    "Chad Lessman",
    "Evalyn Lathem",
    "Ranee Coury",
    "Shery Pigram",
    "Carline Gohr",
    "Versie Konrad",
    "Agatha Kestler",
    "Marchelle Razor",
    "Scot Shibley",
    "Mirtha Wang",
    "Daren Nowell",
    "Marcel Brugger",
    "Albina Buczek",
    "Nelda Dingee",
    "Leslee Herrington",
    "Dorthy Pabst",
    "Angela Kramer",
    "Shirley Bettencourt",
    "Celsa Collado",
    "Debbra Ishibashi",
    "Lorraine Grasso",
    "Denyse Guardiola",
    "Francesca Cross",
    "Petronila Kampa",
    "Latricia Brunson",
    "Florida Kier",
    "Lauretta Infante",
    "Chung Capo",
    "Sybil Silber",
    "Emmie Elvin",
    "Vergie Rosenzweig",
    "Barbra Edenfield",
    "Lavenia Hayne",
    "Skye Shults",
    "Tasha Simerly",
    "Tisha Opp",
    "Hung Cothran",
    "Rosio Mau",
    "Maegan Koeppel",
    "Margot Tamashiro",
    "Anamaria Wisener",
    "Tonya Hillin",
    "Marna Ewald",
    "Terra Holstein",
    "Wilbur Kunzman",
    "Bennie Steib",
    "Jacquelyne Krantz",
    "Coleman Even",
    "Ciara Hendry",
    "Tia Sublett",
    "Candis Wetherington",
    "Jefferey Lafortune",
    "Krystle Baptista",
    "Hyacinth Wardlow",
    "Cornell Mckain",
    "Ivan Tinker",
    "Rosy Cordell",
    "Muriel Urich",
    "Willa Linson",
    "Gilbert Levar",
    "Janis Jost",
    "Jenae Hires",
    "Latrisha Sandoval",
    "Danyell Huls",
    "Janey Durkee",
    "Ervin Selvage",
    "Bradley Schiel",
    "Raymon Cuffee",
    "Reid Dials",
    "Cedrick Rahm",
    "Linn Lessig",
    "Fallon Schooler",
    "Katie Witham",
    "Blondell Genna",
    "Cordelia Vesey",
    "Cassie Skinner"
];

var mails = [
    "@gmail.com",
    "@hotmail.com",
    "@codacitymail.com",
    "@live.nl",
];

var query = "INSERT INTO user (user_firstname, user_mail, user_password, user_birthday, user_lastname, user_name, user_created_at, user_updated_at, user_deleted, user_last_login, role_role_id) VALUES"

for(i = 0; i < names.length; i ++){

    var firstname = names[i].split(" ")[0];
    var lastname = names[i].split(" ")[1];
    var username = firstname+lastname;
    var password = lastname + "12345";
    var bday =  getRandomDate(new Date(1960, 1, 1), new Date(2000,1,1)).yyyymmdd();
    var registeredAt = getRandomDate(new Date(2017, 1, 1), new Date(2018,1,1)).yyyymmdd();
    var createdAt = registeredAt;
    var updatedAt = registeredAt;
    var lastLogin = registeredAt;
    var mail = firstname + lastname + mails[Math.floor(Math.random()*mails.length)];
    var roleId = 1;

    query += "('"+firstname+"', '"+mail+"', '"+password+"', "+bday+", '"+lastname+"', '"+username+"', "+createdAt+", "+updatedAt+", false, "+lastLogin+", "+roleId+"),\n";
}

console.log(query);

