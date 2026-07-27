import {test,expect} from '@playwright/test';
import {POManager} from '../../Practice-POM-ecom/POManager';


test("Handling Pagination web table",async({page})=>{

  const poManager=new POManager(page);
  const getTable=poManager.getWebTable();
  await getTable.goto();
  await getTable.getTableRowClmn("Laptop");



})