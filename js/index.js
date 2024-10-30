const	REQUEST = "../json/videoGames.json";

async function	fetchVideoGamesJson() 
{
	const	response = await fetch(REQUEST);

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

function	createVideoGameCards({title, image, description, price, alt})
{
	return `
		<div class="card" style="width: 18rem;">
			<img src="${image}" class="card-img-top" alt="${alt}">
			<div class="card-body">
				<h5 class="card-title">${title}</h5>
				<p class="card-text">${description}</p>
				<a href="#" class="btn btn-primary">${price}</a>
			</div>
		</div>
	`;
}

async function	displayVideoGames()
{
	const	games = document.getElementById("games");
	const	videoGamesData = await fetchVideoGamesJson();
	let		videoGameCards;

	if (!games)
	{
		console.log("Error: could not get element by class");
		return ;
	}
	if (!videoGamesData)
	{
		games.innerHTML = "<p>Error: couldn't load image correctly</p>";
		return ;
	}
	videoGameCards = videoGamesData.videoGames.map(createVideoGameCards).join('');
	games.innerHTML = videoGameCards;
}

displayVideoGames();
