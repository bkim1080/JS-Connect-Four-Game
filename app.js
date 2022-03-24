document.addEventListener("DOMContentLoaded", () => {
	const board = document.querySelector(".grid");
	//create spots
	for (let i = 0; i < 42; i++) {
		const spots = document.createElement("div");
		board.append(spots);
	}
	for (let i = 0; i < 7; i++) {
		const spots = document.createElement("div");
		spots.classList.add("filled");
		board.append(spots);
	}

	const resetBtn = document.querySelector("button");
	const spots = document.querySelectorAll(".grid div");
	const result = document.querySelector(".result");
	const displayCurrentPlayer = document.querySelector(".current-player");
	const message = document.querySelector(".message");
	const playersTurn = document.querySelector(".players-turn");
	let currentPlayer = "PLAYER 1";
	message.textContent = "Click a spot to start!";

	const winningArrays = [
		[0, 1, 2, 3],
		[41, 40, 39, 38],
		[7, 8, 9, 10],
		[34, 33, 32, 31],
		[14, 15, 16, 17],
		[27, 26, 25, 24],
		[21, 22, 23, 24],
		[20, 19, 18, 17],
		[28, 29, 30, 31],
		[13, 12, 11, 10],
		[35, 36, 37, 38],
		[6, 5, 4, 3],
		[0, 7, 14, 21],
		[41, 34, 27, 20],
		[1, 8, 15, 22],
		[40, 33, 26, 19],
		[2, 9, 16, 23],
		[39, 32, 25, 18],
		[3, 10, 17, 24],
		[38, 31, 24, 17],
		[4, 11, 18, 25],
		[37, 30, 23, 16],
		[5, 12, 19, 26],
		[36, 29, 22, 15],
		[6, 13, 20, 27],
		[35, 28, 21, 14],
		[0, 8, 16, 24],
		[41, 33, 25, 17],
		[7, 15, 23, 31],
		[34, 26, 18, 10],
		[14, 22, 30, 38],
		[27, 19, 11, 3],
		[35, 29, 23, 17],
		[6, 12, 18, 24],
		[28, 22, 16, 10],
		[13, 19, 25, 31],
		[21, 15, 9, 3],
		[20, 26, 32, 38],
		[36, 30, 24, 18],
		[5, 11, 17, 23],
		[37, 31, 25, 19],
		[4, 10, 16, 22],
		[2, 10, 18, 26],
		[39, 31, 23, 15],
		[1, 9, 17, 25],
		[40, 32, 24, 16],
		[9, 17, 25, 33],
		[8, 16, 24, 32],
		[11, 17, 23, 29],
		[12, 18, 24, 30],
		[1, 2, 3, 4],
		[5, 4, 3, 2],
		[8, 9, 10, 11],
		[12, 11, 10, 9],
		[15, 16, 17, 18],
		[19, 18, 17, 16],
		[22, 23, 24, 25],
		[26, 25, 24, 23],
		[29, 30, 31, 32],
		[33, 32, 31, 30],
		[36, 37, 38, 39],
		[40, 39, 38, 37],
		[7, 14, 21, 28],
		[8, 15, 22, 29],
		[9, 16, 23, 30],
		[10, 17, 24, 31],
		[11, 18, 25, 32],
		[12, 19, 26, 33],
		[13, 20, 27, 34],
	];

	function addChip() {
		for (let i = 0; i < spots.length; i++) {
			spots[i].onclick = () => {
				message.textContent = "";
				//if the spot below your current spot is filled, you can add a chip
				if (spots[i + 7].classList.contains("filled") && !spots[i].classList.contains("filled")) {
					if (currentPlayer === "PLAYER 1") {
						spots[i].classList.add("filled");
						spots[i].classList.add("player-one");
						currentPlayer = "PLAYER 2";
						displayCurrentPlayer.textContent = currentPlayer;
					} else if (currentPlayer === "PLAYER 2") {
						spots[i].classList.add("filled");
						spots[i].classList.add("player-two");
						currentPlayer = "PLAYER 1";
						displayCurrentPlayer.textContent = currentPlayer;
					}
				} else {
					message.textContent = "Can't add here";
				}
				//change current player's text color
				if (currentPlayer === "PLAYER 1") {
					displayCurrentPlayer.style.color = "red";
				} else if (currentPlayer === "PLAYER 2") {
					displayCurrentPlayer.style.color = "blue";
				}

				checkForWinner();
			};
		}
	}

	function checkForWinner() {
		for (let j = 0; j < winningArrays.length; j++) {
			const spot1 = spots[winningArrays[j][0]];
			const spot2 = spots[winningArrays[j][1]];
			const spot3 = spots[winningArrays[j][2]];
			const spot4 = spots[winningArrays[j][3]];

			//check if player 1 wins
			if (
				spot1.classList.contains("player-one") &&
				spot2.classList.contains("player-one") &&
				spot3.classList.contains("player-one") &&
				spot4.classList.contains("player-one")
			) {
				result.textContent = "Player One Wins!";
				result.style.color = "red";
				for (let i = 0; i < spots.length; i++) {
					spots[i].onclick = null;
				}
				message.textContent = "";
				displayCurrentPlayer.textContent = "";
				playersTurn.style.display = "none";
			}
			//check if player 2 wins
			if (
				spot1.classList.contains("player-two") &&
				spot2.classList.contains("player-two") &&
				spot3.classList.contains("player-two") &&
				spot4.classList.contains("player-two")
			) {
				result.textContent = "Player Two Wins!";
				result.style.color = "blue";
				for (let i = 0; i < spots.length; i++) {
					spots[i].onclick = null;
				}
				message.textContent = "";
				playersTurn.style.display = "none";
			}
		}
	}

	function resetGame() {
		for (let i = 0; i < spots.length; i++) {
			if (spots[i].classList.contains("player-one") && spots[i].classList.contains("filled")) {
				spots[i].classList.remove("player-one");
				spots[i].classList.remove("filled");
			} else if (spots[i].classList.contains("player-two") && spots[i].classList.contains("filled")) {
				spots[i].classList.remove("player-two");
				spots[i].classList.remove("filled");
			}
		}
		currentPlayer = "PLAYER 1";
		displayCurrentPlayer.textContent = "PLAYER 1";
		displayCurrentPlayer.style.color = "red";
		message.textContent = "";
		result.textContent = "";
		playersTurn.style.display = "block";
		message.textContent = "Click a spot to start!";
		addChip();
	}

	resetBtn.addEventListener("click", resetGame);

	addChip();
});
