// Job Portal Assignment

// You have to create a job portal with the following requirements:


// =========================== 
// app.use("/jobs", jobRoute);
// router
//     .route('/')
//     .get(jobController.findAllJob)
//     .post(verifyToken, authorization('hiring manager'), jobController.createJob)

// router
//     .post('/:id/apply', verifyToken, authorization('candidate'), fileUploader.single("pdf"), jobController.applyJob)

// router
//     .route("/:id")
//     .get(jobController.findOneJob)
//     .patch(
//         verifyToken,
//         authorization("hiring manager"),
//         jobController.updateJob
//     );
// ----------------------------------
// Candidate routes
// GET /jobs Get all Jobs 
// GET /jobs/:id				Get job details with hiring manager info
// POST /jobs/:id/apply			Apply for a job
// Can’t apply after deadline
// If already applied, then can’t apply again
// Can upload a resume(pdf)(BONUS)
// >>>>>>>>>>>>>>>>>>
// app.use("/candidates", candidateRoute);
// .route("/")
//     .get(candidateController.findAllCandidate)
//     .post(candidateController.createCandidate);
// -----------------------------------
// Hiring Manager routes (authorization required)
// POST /jobs Create A Job
// GET /manager/jobs Get all jobs of this hiring manager
// GET /manager/jobs/:id 		Get a job details by id (with applied candidates
// PATCH /jobs/:id 			Update a job
// -------------------------------
// app.use("/manager", managerRoute);
// router
//     .route('/')
//     .get(managerController.findAllManager)
//     .post(managerController.createManager)

// router
//     .get('/jobs', verifyToken, authorization('hiring manager'), managerController.selectedManagerJobs)

// router
//     .get('/jobs/:id', verifyToken, authorization('hiring manager'), managerController.selectedManagerJobById)

// router
//     .route('/:id')
//     .get(managerController.findManagerById)
// ------------------------------------
// Auth routes
// POST /user/signup			Signup/Register
// POST /user/login			Login
// Must generate and send a token as response
// GET /user/me				Get user information by token
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// app.use("/user", userRoute);
// router
//     .route('/signup')
//     .post(userController.signupUser)

// router
//     .route('/login')
//     .post(userController.loginUser)

// router
//     .get("/me", verifyToken, userController.getAuth);
// -----------------------------
// app.use("/admin", adminRoute);
// Email: admin@gmail.com
// Password: Admin123#
