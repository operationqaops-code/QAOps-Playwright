Feature: Ecommerce Validations
Verify that the users are able to login with their credentials and buy a product.
@Validation
@foo
 Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"   
    Then Verify Error message is displayed

    Examples:
      | username                     | password      |
      | awalom.official@gmail.com    | Abdul@786     |
      | example@gmail.com            | example@786   |


   
 