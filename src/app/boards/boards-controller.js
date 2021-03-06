'use strict';

angular.module('noterious')
  .controller('BoardsCtrl', function (currentUser, BoardsModel, $rootScope) {
    var ctrl = this;

    ctrl.loading = false;

    ctrl.newBoard = {
      title: '',
      description: '',
      isPublic: false
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newBoard = {
        title: '',
        description: '',
        isPublic: false
      };
    };

    ctrl.getBoards = function () {
      BoardsModel.all()
        .then(function (result) {
          if (result) {
            ctrl.boards = result;
          }
          else {
            ctrl.boards = {};
          }
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.createBoard = function (board, isValid) {
      if (isValid) {
        ctrl.loading = true;

        BoardsModel.create(board)
          .then(function (boardId) {
            ctrl.boards[boardId] = board;
        });

        ctrl.resetForm();
      }
    };

    ctrl.updateBoard = function (boardId, board, isValid) {
      if (isValid) {
        ctrl.loading = true;

        BoardsModel.update(boardId, board);

        ctrl.boards[boardId] = board;

        ctrl.cancelEditing();
      }
    };

    ctrl.deleteBoard = function (boardId) {
      ctrl.loading = true;
      // DELETE BOARD
      ctrl.cancelEditing();
    };

    ctrl.setEditedBoard = function (boardId, board) {
      ctrl.editedBoardId = boardId;
      ctrl.editedBoard = angular.copy(board);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentBoard = function (boardId) {
      return ctrl.editedBoard !== null && ctrl.editedBoardId === boardId;
    };

    ctrl.cancelEditing = function () {
      ctrl.loading = false;
      ctrl.editedBoardId = null;
      ctrl.editedBoard = null;
      ctrl.isEditing = false;
    };

    $rootScope.$on('userIdSet', function () {
      ctrl.getBoards();
    });
  });