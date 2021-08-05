import PuySupTableMock from "./PuySupTableMock";
import MockUtils from "./../mock.utils";

export default function mockPuySup(mock) {
  mock.onPost("api/PuySups").reply(({ data }) => {
    const { PuySup } = JSON.parse(data);
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
    } = PuySup;

    const id = generateUserId();
    const newPuySup = {
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
    PuySupTableMock.push(newPuySup);
    return [200, { PuySup: newPuySup }];
  });

  mock.onPost("api/PuySups/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdPuySups = mockUtils.baseFilter(
      PuySupTableMock,
      queryParams
    );
    return [200, filterdPuySups];
  });

  mock.onPost("api/PuySups/deletePuySups").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = PuySupTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        PuySupTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/PuySups/updateStatusForPuySups").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    PuySupTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/PuySups\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuySups\/(\d+)/)[1];
    const PuySup = PuySupTableMock.find(el => el.id === +id);
    if (!PuySup) {
      return [400];
    }

    return [200, PuySup];
  });

  mock.onPut(/api\/PuySups\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuySups\/(\d+)/)[1];
    const { PuySup } = JSON.parse(config.data);
    const index = PuySupTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    PuySupTableMock[index] = { ...PuySup };
    return [200];
  });

  mock.onDelete(/api\/PuySups\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuySups\/(\d+)/)[1];
    const index = PuySupTableMock.findIndex(el => el.id === +id);
    PuySupTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = PuySupTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
