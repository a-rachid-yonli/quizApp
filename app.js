let category = document.querySelector(".category");
let question = document.querySelector(".question");

let alert2 = document.querySelector(".alt2");
let alert3 = document.querySelector(".alt3");
let alert4 = document.querySelector(".alt4");

let response = document.querySelector(".correct");
let type = document.querySelector(".type");
let difficulty = document.querySelector(".Difficulty");
let content = document.querySelector(".content");
let get = document.querySelector('.badge-success')
let lose = document.querySelector('.badge-danger')
let check = document.querySelector('.btn-primary')
let clear = document.querySelector('.btn-danger')
if (!(localStorage.get && localStorage.lose)) {
    localStorage.get = 0;
    localStorage.lose = 0;
} else {
    get.textContent = localStorage.get
    lose.textContent = localStorage.lose
}

function generate() {
    fetch("https://opentdb.com/api.php?amount=1")
        .then((Response) => Response.json())
        .then(data => {
            category.textContent = data.results[0].category;
            question.textContent = data.results[0].question;
            type.textContent = data.results[0].type;
            difficulty.textContent = data.results[0].difficulty;
            var incorrect = data.results[0].incorrect_answers.length;
            let random = Math.floor(Math.random() * incorrect + 1);
            for (let i = 0; i <= random; i++) {
                if (i == random) {
                    content.innerHTML +=
                        '<div class="col-5 mx-1 btn alert alt3 shadow-lg text-dark bonne alert-light">' +
                        data.results[0].correct_answer +
                        "</div>";
                } else {
                    content.innerHTML +=
                        '<div class="col-5 mx-1 btn alert alt3 shadow-lg Mal text-dark alert-light">' +
                        data.results[0].incorrect_answers +
                        "</div>";
                }
            }
            console.log(data);

            try {
                function reload() {
                    let bonne = document.querySelector('.bonne');
                    let Mal = document.querySelectorAll('.Mal');
                    bonne.addEventListener('click', function(b) {
                        localStorage.get++
                            get.textContent = localStorage.get

                        content.textContent = ""
                        generate();
                    })
                    for (let i = 0; i <= random; i++) {
                        Mal[i].addEventListener('click', function(m) {
                            localStorage.lose++
                                lose.textContent = localStorage.lose
                            response.textContent = data.results[0].correct_answer;
                            content.textContent = ""
                            generate()
                        })
                    }
                }
                response.textContent = ""
                reload()
            } catch (err) {
                console(err)
            }
        })
}
generate();

check.addEventListener('click', function() {
    content.textContent = ""
    generate();
});

clear.addEventListener('click', function() {
    localStorage.get = 0;
    localStorage.lose = 0;
    get.textContent = localStorage.get
    lose.textContent = localStorage.lose
    content.textContent = ""
    generate();
})