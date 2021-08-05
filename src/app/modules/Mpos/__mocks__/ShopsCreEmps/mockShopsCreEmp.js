import ShopsCreEmpTableMock from "./ShopsCreEmpTableMock";
import MockUtils from "./../mock.utils";

export default function mockShopsCreEmp(mock) {
  mock.onPost("api/ShopsCreEmps").reply(({ data }) => {
    const { ShopsCreEmp } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = ShopsCreEmp;

    const id = generateUserId();
    const newShopsCreEmp = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    ShopsCreEmpTableMock.push(newShopsCreEmp);
    return [200, { ShopsCreEmp: newShopsCreEmp }];
  });

  mock.onPost("api/ShopsCreEmps/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdShopsCreEmps = mockUtils.baseFilter(
      ShopsCreEmpTableMock,
      queryParams
    );
    return [200, filterdShopsCreEmps];
  });

  mock.onPost("api/ShopsCreEmps/deleteShopsCreEmps").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = ShopsCreEmpTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        ShopsCreEmpTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/ShopsCreEmps/updateStatusForShopsCreEmps").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    ShopsCreEmpTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/ShopsCreEmps\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreEmps\/(\d+)/)[1];
    const ShopsCreEmp = ShopsCreEmpTableMock.find(el => el.id === +id);
    if (!ShopsCreEmp) {
      return [400];
    }

    return [200, ShopsCreEmp];
  });

  mock.onPut(/api\/ShopsCreEmps\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreEmps\/(\d+)/)[1];
    const { ShopsCreEmp } = JSON.parse(config.data);
    const index = ShopsCreEmpTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    ShopsCreEmpTableMock[index] = { ...ShopsCreEmp };
    return [200];
  });

  mock.onDelete(/api\/ShopsCreEmps\/\d+/).reply(config => {
    const id = config.url.match(/api\/ShopsCreEmps\/(\d+)/)[1];
    const index = ShopsCreEmpTableMock.findIndex(el => el.id === +id);
    ShopsCreEmpTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = ShopsCreEmpTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
