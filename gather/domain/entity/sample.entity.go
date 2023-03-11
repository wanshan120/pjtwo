/*

エンティティ層は、アプリケーションが扱うビジネスオブジェクトを表現するための層です。
つまり、データベースのテーブルやAPIのレスポンスといったデータを、
アプリケーションのビジネスロジックに合わせて表現することが目的です。

エンティティは、ビジネスオブジェクトの状態を表現するためのフィールドやメソッドを持ちます。
また、ビジネスルールを表現するためのバリデーションロジックなども含まれます。
データベースのORMや外部APIのレスポンスをエンティティに変換し、
ビジネスロジックがこれらのデータを扱うようにします。

*/

package entity
