const request = require("supertest");
const api = require("./index");

describe("Random shows API", () => {
	afterAll((done) => {
		api.close();
		done();
	});

	describe("when the home endpoint is requested", () => {
		it("should explain the user the endpoints available", async () => {
			const res = await request(api).get("/");

			expect(res.statusCode).toEqual(200);
			expect(res.req.method).toEqual("GET");
			expect(res.text).toEqual(
				"This API has two endpoints: '/hello' that returns 'Hello world' and '/show' that returns a random show name so you can finally decide what to watch :)"
			);
		});
	});

	describe("when the hello world endpoint is requested", () => {
		it("should display hello world", async () => {
			const res = await request(api).get("/hello");

			expect(res.statusCode).toEqual(200);
			expect(res.req.method).toEqual("GET");
			expect(res.text).toEqual("Hello world");
		});
	});

	describe("when the show endpoint is requested", () => {
		it("should display a show name", async () => {
			const res = await request(api).get("/show");

			expect(res.statusCode).toEqual(200);
			expect(res.req.method).toEqual("GET");

			const textToExpect = expect.stringMatching(/^The show I recommend is:/);
			expect(res.text).toEqual(textToExpect);
		});
	});
});
