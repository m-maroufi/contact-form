const form = document.querySelector("#contact-form");
const errMsgForReqInpt = "This field is required";
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const queryType = document.querySelectorAll("input[name='query-type']");
const consentTeam = document.querySelector("input[name='consentTeam']");
const alert = document.querySelector(".alert");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const alertDelay = 4000;

// checked radio button
queryType.forEach(elm => {
	elm.addEventListener("change", function () {
		if (this.checked) {
			console.log();

			queryType.forEach(function (item) {
				if (item !== this) {
					item.checked = false;
					item.parentElement.classList.remove("selected");
				}
			});
			this.checked = true;
			this.parentElement.classList.add("selected");
		}
	});
});
// form submit
form.addEventListener("submit", e => {
	e.preventDefault();
	// first name validetion
	const firstNameVal = validetInput(firstName);
	// last name validetion
	const lastNameVal = validetInput(lastName);
	// email validetion
	const emailVal = emailValidetion(email);
	// message validetion
	const messageVal = validetInput(message);
	// consent team validetion
	const consentTeamVal = checkedValidetion(consentTeam);
	// query type validetion
	const queryTypeVal = checkedValidetion(
		document.querySelector("input[name='query-type']:checked"),
	);
	if (!queryTypeVal) {
		const parentEl = document.querySelector("input[name='query-type']")
			.parentElement.parentElement.parentElement;
		const errEl = parentEl.querySelector(".error");
		errEl.textContent = errMsgForReqInpt;
	} else {
		const parentEl = document.querySelector("input[name='query-type']")
			.parentElement.parentElement.parentElement;
		const errEl = parentEl.querySelector(".error");
		errEl.textContent = "";
	}
	// set data

	const data = {
		firstName: firstNameVal,
		lastName: lastNameVal,
		email: emailVal,
		message: messageVal,
		queryType: queryTypeVal,
		consentTeam: consentTeamVal,
	};

	if (
		!data.email ||
		!data.consentTeam ||
		!data.firstName ||
		!data.lastName ||
		!data.message ||
		!data.queryType
	) {
	} else {
		alert.classList.add("active");
		setTimeout(() => {
			alert.classList.remove("active");
		}, alertDelay);
		restStyleForm();
	}
	console.log(data);
});

// validet text input
function validetInput(inputEl) {
	const inputValue = inputEl.value.trim();
	if (!inputValue || inputValue == "" || inputEl.length < 3) {
		const errEl = inputEl.nextElementSibling;
		inputEl.style.borderColor = "var(--red-clr)";
		errEl.textContent = errMsgForReqInpt;
		return false;
		// previousSibling
	} else {
		const errEl = inputEl.nextElementSibling;
		inputEl.style.borderColor = "var(--grey-clr-900)";
		errEl.textContent = "";
		return inputValue;
	}
}
// validet email
function emailValidetion(emailEl) {
	const emailValue = emailEl.value;
	if (!emailValue || emailValue == "" || emailValue.length < 3) {
		const errEl = emailEl.nextElementSibling;
		emailEl.style.borderColor = "var(--red-clr)";
		errEl.textContent = errMsgForReqInpt;
		return false;
		// previousSibling
	} else {
		const errEl = emailEl.nextElementSibling;
		emailEl.style.borderColor = "var(--grey-clr-900)";
		errEl.textContent = "";
		const emailVal = emailEl.value;
		if (!emailRegex.test(emailVal)) {
			errEl.textContent = "Email is not valid";
			emailEl.style.borderColor = "var(--red-clr)";
			return false;
		}
		return emailVal;
	}
}

// validet checkbox
function checkedValidetion(inputEl) {
	if (!inputEl) {
		return false;
	}
	if (inputEl.type === "radio") {
		if (inputEl.checked) {
			return inputEl.value;
		}
		return false;
	}
	if (inputEl.type === "checkbox") {
		if (!consentTeam.checked) {
			const parentEl = consentTeam.parentNode.parentElement;
			const errEl = parentEl.querySelector("span.error");
			errEl.textContent = `To submit this form, please consent to being contacted`;
			return false;
			// previousSibling
		} else {
			const parentEl = consentTeam.parentNode.parentElement;
			const errEl = parentEl.querySelector("span.error");
			errEl.textContent = ``;
			return consentTeam.value;
			// previousSibling
		}
	}
}

// reset form and all styles
function restStyleForm() {
	const errEls = document.querySelectorAll(".error");
	errEls.forEach(errEl => {
		errEl.textContent = "";
	});
	const inputEls = document.querySelectorAll("input, select, textarea");
	inputEls.forEach(el => {
		el.style.borderColor = "var(--grey-clr-900)";
	});
	const radioLabel = document.querySelectorAll(".radio-field");
	radioLabel.forEach(el => {
		el.style.color = "var(--grey-clr-900)";
		el.style.background = "transparent";
		el.style.borderColor = "var(--grey-clr-500)";
	});
	form.reset();
}
