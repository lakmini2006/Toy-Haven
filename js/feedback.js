/* Toy Haven - Feedback & Support JavaScript */

/* Feedback Form Elements */

const feedbackForm =
    document.getElementById("feedback-form");

const feedbackSuccess =
    document.getElementById("feedback-success");


/* Error Handling */

function showFeedbackError(elementId, message) {

    const error =
        document.getElementById(elementId);

    if (error) {

        error.textContent = message;

    }

}


function clearFeedbackErrors() {

    showFeedbackError(
        "feedback-name-error",
        ""
    );

    showFeedbackError(
        "feedback-email-error",
        ""
    );

    showFeedbackError(
        "feedback-rating-error",
        ""
    );

    showFeedbackError(
        "feedback-message-error",
        ""
    );

}


/* Email Validation */

function isFeedbackEmailValid(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* Submit Feedback */

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearFeedbackErrors();

            const name =
                document.getElementById(
                    "feedback-name"
                ).value.trim();

            const email =
                document.getElementById(
                    "feedback-email"
                ).value.trim();

            const rating =
                document.getElementById(
                    "feedback-rating"
                ).value;

            const message =
                document.getElementById(
                    "feedback-message"
                ).value.trim();

            let isValid = true;


            /* Name Validation */

            if (name === "") {

                showFeedbackError(
                    "feedback-name-error",
                    "Please enter your name."
                );

                isValid = false;

            } else if (name.length < 2) {

                showFeedbackError(
                    "feedback-name-error",
                    "Name must be at least 2 characters."
                );

                isValid = false;

            }


            /* Email Validation */

            if (email === "") {

                showFeedbackError(
                    "feedback-email-error",
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isFeedbackEmailValid(email)) {

                showFeedbackError(
                    "feedback-email-error",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* Rating Validation */

            if (rating === "") {

                showFeedbackError(
                    "feedback-rating-error",
                    "Please select a rating."
                );

                isValid = false;

            }


            /* Message Validation */

            if (message === "") {

                showFeedbackError(
                    "feedback-message-error",
                    "Please enter your feedback."
                );

                isValid = false;

            } else if (message.length < 10) {

                showFeedbackError(
                    "feedback-message-error",
                    "Feedback must be at least 10 characters."
                );

                isValid = false;

            }


            if (!isValid) {
                return;
            }


            /* Create Feedback */

            const feedback = {

                id: "FB-" + Date.now(),

                name: name,

                email: email,

                rating: Number(rating),

                message: message,

                date: new Date().toLocaleString()

            };


            /* Save Feedback */

            const feedbackHistory =
                JSON.parse(
                    localStorage.getItem(
                        "toyHavenFeedback"
                    )
                ) || [];

            feedbackHistory.push(feedback);

            localStorage.setItem(
                "toyHavenFeedback",
                JSON.stringify(feedbackHistory)
            );


            /* Show Success */

            feedbackForm.style.display = "none";

            feedbackSuccess.classList.add("show");

        }
    );

}


/* FAQ Accordion */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );

faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {

            const faqItem =
                question.closest(".faq-item");

            document
                .querySelectorAll(".faq-item")
                .forEach(function (item) {

                    if (item !== faqItem) {

                        item.classList.remove("active");

                    }

                });

            faqItem.classList.toggle("active");

        }
    );

});