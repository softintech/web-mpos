import ResultTableMock from "./ResultTableMock";
import MockUtils from "./../mock.utils";

export default function mockResult(mock) {
  mock.onPost("api/Results").reply(({ data }) => {
    const { Result } = JSON.parse(data);
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
    } = Result;

    const id = generateUserId();
    const newResult = {
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
    ResultTableMock.push(newResult);
    return [200, { Result: newResult }];
  });

  mock.onPost("api/Results/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdResults = mockUtils.baseFilter(
      ResultTableMock,
      queryParams
    );
    return [200, filterdResults];
  });

  mock.onPost("api/Results/deleteResults").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = ResultTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        ResultTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/Results/updateStatusForResults").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    ResultTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/Results\/\d+/).reply(config => {
    const id = config.url.match(/api\/Results\/(\d+)/)[1];
    const Result = ResultTableMock.find(el => el.id === +id);
    if (!Result) {
      return [400];
    }

    return [200, Result];
  });

  mock.onPut(/api\/Results\/\d+/).reply(config => {
    const id = config.url.match(/api\/Results\/(\d+)/)[1];
    const { Result } = JSON.parse(config.data);
    const index = ResultTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    ResultTableMock[index] = { ...Result };
    return [200];
  });

  mock.onDelete(/api\/Results\/\d+/).reply(config => {
    const id = config.url.match(/api\/Results\/(\d+)/)[1];
    const index = ResultTableMock.findIndex(el => el.id === +id);
    ResultTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = ResultTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
