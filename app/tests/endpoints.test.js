// require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const app = require('./../dist/index')
const supertest = require('supertest')
const request = supertest(app)

describe('GET /employeesExample', () => {
    let response;

    beforeAll( async () => {
        response = await request.get('/employeesExample');
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 200', async () => {
        expect(response.status).toBe(200)
    });

    it('Returns success true', async () => {
        expect(response.body.success).toBe(true)
    });

    it('Body of type array', async () => {
        expect(Array.isArray(response.body.data)).toBeTruthy()
    });
  
});

describe('GET /employee/:${emp_no}', () => {
    let response;

    beforeAll( async () => {
        response = await request.get('/employee/50000');
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 200', async () => {
        expect(response.status).toBe(200)
    });

    it('Returns success true', async () => {
        expect(response.body.success).toBe(true)
    });

    it('Consistent response', async () => {
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        "emp_no": 50000,
                        "birth_date": "1956-10-13",
                        "first_name": "Nakhoon",
                        "last_name": "Mandelberg",
                        "gender": "M",
                        "hire_date": "1994-02-20"
                    }
                )
            ])
        );
        expect(Array.isArray(response.body.data)).toBeTruthy()
    });
  
});

describe('GET /employee/:${emp_no}/titles', () => {
    let response;

    beforeAll( async () => {
        response = await request.get('/employee/50000/titles');
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 200', async () => {
        expect(response.status).toBe(200)
    });

    it('Returns success true', async () => {
        expect(response.body.success).toBe(true)
    });

    it('Consistent response', async () => {
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    {
                        "from_date": "1999-02-20",
                        "to_date": "9999-01-01",
                        "title": "Senior Engineer"
                    }
                ),
                expect.objectContaining(
                    {
                        "from_date": "1994-02-20",
                        "to_date": "1999-02-20",
                        "title": "Engineer"
                    }
                )
            ])
        );
        expect(Array.isArray(response.body.data)).toBeTruthy()
    });
  
});

describe('POST /employee/add', () => {
    let response;

    beforeAll( async () => {
        response = await request.post('/employee/add').send(
            {
                "birth_date": "1995-10-22",
                "first_name": "Esteban",
                "last_name": "Cruz Torres",
                "gender": "M",
                "hire_date": "2019-10-19"
            }
        );
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 200', async () => {
        expect(response.status).toBe(200)
    });

    it('Returns success true', async () => {
        expect(response.body.success).toBe(true)
    });

    it('Consistent response', async () => {
        expect(response.body.data).toEqual(
            expect.objectContaining(
                {
                    "birth_date": "1995-10-22",
                    "first_name": "Esteban",
                    "last_name": "Cruz Torres",
                    "gender": "M",
                    "hire_date": "2019-10-19"
                }
            )
        );
    });
  
});

afterAll((done) => {
    app.close(done);
});
