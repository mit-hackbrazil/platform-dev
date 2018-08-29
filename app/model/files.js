import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

export const Files = new FilesCollection({
  collectionName: "files",

  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in pdf/png/jpg/jpeg formats
    if (file.size <= 10485760 && /pdf|png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
})


Files.collection.attachSchema(new SimpleSchema(Files.schema));