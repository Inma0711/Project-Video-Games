const	requestURL = "../json/videoGames.json";

async function	fetchVideoGamesJson()
{
	const	response = await fetch(requestURL);

	try 
	{
		if (!response.ok) {
			throw new Error("Error: file not found: ", response.status);
		}
		return await response.json();
	}
	catch (error)
	{
		console.error(error);
		return null;
	}
}

function	createVideoGamesCards(image, description, price)
{
	return `
		<div class="card" style="width: 18rem;">
			<img src="..." class="card-img-top" alt="...">
			<div class="card-body">
				<h5 class="card-title">Card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	`;
}

async function	displayVideoGames()
{
	const	games = document.getElementById("games");
	const	videoGamesData = await fetchVideoGamesJson();
	let		videoGamesCards;

	if (!videoGamesData || !videoGamesData.videoGames)
	{
		games.innerHTML = "<p>Error: couldn't load image correctly</p>";
		return ;
	}
	videoGamesCards = videoGamesData.videoGames.map(createVideoGamesCards).join('');
	games.innerHTML = videoGamesCards;
}

displayVideoGames();
