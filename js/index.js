async function	fetchJson(request)
{
	const	response = await fetch(request);
	
	try
	{
		if (!response.ok) 
		{
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

function	createReviewsCards({name, reviewImg, userImg, stars})
{
	return `
		<div class="card">
			<div class="image-box">
				<img src="${reviewImg}" alt="Review image">
			</div>
			<div class="profile-details">
				<img src="${userImg}" alt="User image">
				<div class="name-user">
					<h3 class="name">${name}</h3>
					<h4 class="stars">${stars}</h4>
				</div>
			</div>
		</div>
	`;
}

async function	displayReviews()
{
	const	request = "./json/reviews.json";
	const	reviews = document.getElementById("reviews");
	const	reviewsData = await fetchJson(request);
	let		reviewsCards;
	
	if (!reviews)
	{
		console.error("Error: could not get element by id");
		return ;
	}
	if (!reviewsData)
	{
		console.error("Error: couldn't load image correctly");
		return ;
	}
	reviewsCards = reviewsData.reviews.map(createReviewsCards).join('');
	reviews.innerHTML = reviewsCards;
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
	const	request = "./json/videoGames.json";
	const	games = document.getElementById("games");
	const	videoGamesData = await fetchJson(request);
	let		videoGameCards;
	
	if (!games)
	{
		console.error("Error: could not get element by id");
		return ;
	}
	if (!videoGamesData)
	{
		console.error("Error: couldn't load image correctly");
		return ;
	}
	videoGameCards = videoGamesData.videoGames.map(createVideoGameCards).join('');
	games.innerHTML = videoGameCards;
}

displayVideoGames();
displayReviews();
