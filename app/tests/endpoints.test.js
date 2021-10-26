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

describe('[FAIL][Wrong birth_date] POST /employee/add', () => {
    let response;

    beforeAll( async () => {
        response = await request.post('/employee/add').send(
            {
                "birth_date": "1995-10-2a",
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

    it('Returns code status 400', async () => {
        expect(response.status).toBe(400)
    });

    it('Returns success false', async () => {
        expect(response.body.success).toBe(false)
    });

    it('Error type: ValidationError', async () => {
        expect(response.body.type).toEqual('ValidationError');
    });
  
});

describe('[FAIL][Wrong gender] POST /employee/add', () => {
    let response;

    beforeAll( async () => {
        response = await request.post('/employee/add').send(
            {
                "birth_date": "1995-10-22",
                "first_name": "Esteban",
                "last_name": "Cruz Torres",
                "gender": "wrong",
                "hire_date": "2019-10-19"
            }
        );
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 400', async () => {
        expect(response.status).toBe(400)
    });

    it('Returns success false', async () => {
        expect(response.body.success).toBe(false)
    });

    it('Error type: ValidationError', async () => {
        expect(response.body.type).toEqual('ValidationError');
    });
  
});

describe('[FAIL][Wrong hire_date] POST /employee/add', () => {
    let response;

    beforeAll( async () => {
        response = await request.post('/employee/add').send(
            {
                "birth_date": "1995-10-22",
                "first_name": "Esteban",
                "last_name": "Cruz Torres",
                "gender": "F",
                "hire_date": "201910-19"
            }
        );
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 400', async () => {
        expect(response.status).toBe(400)
    });

    it('Returns success false', async () => {
        expect(response.body.success).toBe(false)
    });

    it('Error type: ValidationError', async () => {
        expect(response.body.type).toEqual('ValidationError');
    });
  
});

describe('[FAIL][Wrong URL] GET /asdfg', () => {
    let response;

    beforeAll( async () => {
        response = await request.get('/asdfg');
    })

    it('content-type application/json; application/json; charset=utf-8', async () => {
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    });

    it('Returns code status 404', async () => {
        expect(response.status).toBe(404)
    });

    it('Returns success false', async () => {
        expect(response.body.success).toBe(false)
    });

    it('Error type: NotFound', async () => {
        expect(response.body.type).toEqual('NotFound');
    });

    it('Error message', async () => {
        expect(response.body.message).toEqual('The server has not found anything matching the Request');
    });
  
});

afterAll((done) => {
    app.close(done);
});
