/* =========================================
   TOY HAVEN - FEEDBACK & SUPPORT JAVASCRIPT
========================================= */


/* =========================================
   FEEDBACK FORM ELEMENTS
========================================= */

const feedbackForm =
    document.getElementById("feedback-form");

const feedbackSuccess =
    document.getElementById("feedback-success");


/* =========================================
   ERROR FUNCTION
========================================= */

function showFeedbackError(elementId, message) {

    const error =
        document.getElementById(elementId);

    if (error) {
        error.textContent = message;
    }
}


/* =========================================
   CLEAR ERRORS
========================================= */

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


/* =========================================
   EMAIL VALIDATION
========================================= */

function isFeedbackEmailValid(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================
   SUBMIT FEEDBACK
========================================= */

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearFeedbackErrors();


            /* GET VALUES */

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


            /* =====================================
               NAME VALIDATION
            ===================================== */

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


            /* =====================================
               EMAIL VALIDATION
            ===================================== */

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


            /* =====================================
               RATING VALIDATION
            ===================================== */

            if (rating === "") {

                showFeedbackError(
                    "feedback-rating-error",
                    "Please select a rating."
                );

                isValid = false;

            }


            /* =====================================
               MESSAGE VALIDATION
            ===================================== */

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


            /* STOP IF INVALID */

            if (!isValid) {
                return;
            }


            /* =====================================
               CREATE FEEDBACK OBJECT
            ===================================== */

            const feedback = {

                id: "FB-" + Date.now(),

                name: name,

                email: email,

                rating: Number(rating),

                message: message,

                date: new Date().toLocaleString()

            };


            /* =====================================
               GET EXISTING FEEDBACK
            ===================================== */

            const feedbackHistory =
                JSON.parse(
                    localStorage.getItem(
                        "toyHavenFeedback"
                    )
                ) || [];


            /* ADD NEW FEEDBACK */

            feedbackHistory.push(feedback);


            /* =====================================
               SAVE TO LOCAL STORAGE
            ===================================== */

            localStorage.setItem(
                "toyHavenFeedback",
                JSON.stringify(feedbackHistory)
            );


            /* =====================================
               SHOW SUCCESS
            ===================================== */

            feedbackForm.style.display = "none";

            feedbackSuccess.classList.add("show");


        }
    );

}


/* =========================================
   FAQ ACCORDION
========================================= */

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


            /* Close other FAQ items */

            document
                .querySelectorAll(".faq-item")
                .forEach(function (item) {

                    if (item !== faqItem) {

                        item.classList.remove("active");

                    }

                });


            /* Toggle selected item */

            faqItem.classList.toggle("active");

        }
    );

});