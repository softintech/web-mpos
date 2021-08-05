import ServiceAlTableMock from "./ServiceAlTableMock";
import MockUtils from "./../mock.utils";

export default function mockServiceAl(mock) {
  mock.onPost("api/ServiceAls").reply(({ data }) => {
    const { ServiceAl } = JSON.parse(data);
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
    } = ServiceAl;

    const id = generateUserId();
    const newServiceAl = {
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
    ServiceAlTableMock.push(newServiceAl);
    return [200, { ServiceAl: newServiceAl }];
  });

  mock.onPost("api/ServiceAls/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdServiceAls = mockUtils.baseFilter(
      ServiceAlTableMock,
      queryParams
    );
    return [200, filterdServiceAls];
  });

  mock.onPost("api/ServiceAls/deleteServiceAls").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = ServiceAlTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        ServiceAlTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/ServiceAls/updateStatusForServiceAls").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    ServiceAlTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/ServiceAls\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceAls\/(\d+)/)[1];
    const ServiceAl = ServiceAlTableMock.find(el => el.id === +id);
    if (!ServiceAl) {
      return [400];
    }

    return [200, ServiceAl];
  });

  mock.onPut(/api\/ServiceAls\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceAls\/(\d+)/)[1];
    const { ServiceAl } = JSON.parse(config.data);
    const index = ServiceAlTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    ServiceAlTableMock[index] = { ...ServiceAl };
    return [200];
  });

  mock.onDelete(/api\/ServiceAls\/\d+/).reply(config => {
    const id = config.url.match(/api\/ServiceAls\/(\d+)/)[1];
    const index = ServiceAlTableMock.findIndex(el => el.id === +id);
    ServiceAlTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = ServiceAlTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
