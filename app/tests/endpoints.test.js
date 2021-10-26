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

    it('Hire date in range', async () => {
        expect(response.body.data.some((item) => {
            let hire_date = Date(item.hire_date);
            let from_date = Date('1990-01-01')
            let to_date = Date('1990-01-15')
            return hire_date < from_date || hire_date > to_date 
        })).toBe(false)
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
        response = await request.get('/employee/42030/titles');
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
                        "from_date": "1996-10-19",
                        "to_date": "9999-01-01",
                        "title": "Senior Staff"
                    },
                ),
                expect.objectContaining(
                    {
                        "from_date": "1987-10-20",
                        "to_date": "1996-10-19",
                        "title": "Staff"
                    }
                )
            ])
        );
        expect(Array.isArray(response.body.data)).toBeTruthy()
    });

    it('Data in desc chronological order', async () => {
        let crhonological = true;
        for(let i = 0; i < (response.body.data.length - 1); i++) {
            let date1 = Date(response.body.data[i].from_date);
            let date2 = Date(response.body.data[i + 1].from_date);
            if( date1 > date2 ) {
                crhonological = false;
                break
            }
        }
        expect(crhonological).toBe(true)
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
