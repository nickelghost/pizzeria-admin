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
  Create,
  SimpleForm,
  TextInput,
  FileInput,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const fileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
    });

const dataProvider = simpleRestProvider("http://localhost:4000/admin");

const dataProviderWithOverrides = {
  ...dataProvider,
  create: async (resource, params) => {
    if (resource !== 'carousel-items') {
      return dataProvider.create(resource, params);
    }
    const file = params.data.picture;
    const fileBase64 = await fileToBase64(file);
    return dataProvider.create(resource, {
      ...params,
      data: {
        ...params.data,
        picture: fileBase64,
      },
    });
  },
};

const App = () => (
  <Admin dataProvider={dataProviderWithOverrides}>
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
      create={(props) => (
        <Create {...props}>
          <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <FileInput multiple={false} label="Picture" source="picture">
              <ImageField source="src" title="title" />
            </FileInput>
            <TextInput label="Destination URL" source="destinationUrl" />
          </SimpleForm>
        </Create>
      )}
    />
  </Admin>
);

export default App;
