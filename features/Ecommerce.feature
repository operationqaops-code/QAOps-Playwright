Feature: Ecommerce Validations
    Verify that the users are able to login with their credentials and buy a product.
    @Regression

 Scenario: Placing the Order
    Given a login to Ecommerce application with "awalom.official@gmail.com" and "Abdul@786"
    When Add "ZARA COAT 3" to the cart 
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter Valid details and place the Order
    Then Verify Order is present in the OrderHistory

@Validation
 Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"   
    Then Verify Error message is displayed

    Examples:
      | username                     | password      |
      | awalom.official@gmail.com    | Abdul@786     |
      | example@gmail.com            | example@786   |
