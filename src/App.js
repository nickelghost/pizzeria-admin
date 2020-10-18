import React from "react";
import {
  Admin,
  Resource,
  TextField,
  DateField,
  Datagrid,
  UrlField,
  List,
  ImageField,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("http://localhost:4000/admin");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="carousel-items"
      list={(props) => (
        <List {...props}>
          <Datagrid>
            <TextField label="ID" source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <ImageField label="Picture" source="pictureUrl" />
            <UrlField label="Destination URL" source="destinationUrl" />
            <DateField showTime source="createdAt" />
            <DateField showTime source="updatedAt" />
          </Datagrid>
        </List>
      )}
    />
  </Admin>
);

export default App;
