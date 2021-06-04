const axios = require('axios');
const keyMovie = process.env.MOVIE_API_KEY;



function movieHandler(req, res) {
    // let keyMovie = process.env.MOVIE_API_KEY;
    let movie = req.query.searchQuery;

    let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=${keyMovie}&query=${movie}`
     console.log(urlMovie);
    axios
        .get(urlMovie)
        .then(resultMovie => {
            console.log('movie>>>>>>>>>', resultMovie.data.results)
            const movieData = resultMovie.data.results.map(itemM => {
                return new Movie(itemM);

            })
            res.send(movieData);

        })
        .catch(err => {
            res.status(500).send(`error in getting the movie data ==> ${err}`);
        })

}
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.total_votes = item.vote_count;
        this.average_votes = item.vote_average;
        this.imade_url = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
        this.popularity = item.popularity;
        this.released_on = item.release_date;

    }
}

module.exports = movieHandler;