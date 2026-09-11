from django.test import TestCase

from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

# Create your tests here.

class PatternAPITestCase(APITestCase):
    """
    Pattern API 자동 테스트

    테스트 범위
    1. 로그인 사용자의 Pattern 생성
    2. 자신의 Pattern 목록 조회
    3. 자신의 Pattern 상세 조회
    4. 자신의 Pattern 수정
    5. 자신의 Pattern 삭제
    6. 다른 사용자의 Pattern 접근 차단
    7. 비로그인 사용자의 개인 Pattern API 접근 차단
    8. Public Pattern 목록 조회
    9. Public Pattern 상세 조회
    10. Private Pattern의 Public API 노출 차단
    """

    def setUp(self):
        """
        각 테스트가 실행되기 전에 필요한 테스트 데이터를 생성한다.
        """

        # 테스트용 사용자 2명 생성
        self.user1 = User.objects.create_user(
            username="testuser1",
            password="testpassword123",
        )

        self.user2 = User.objects.create_user(
            username="testuser2",
            password="testpassword123",
        )

        # Pattern API 기본 URL
        self.pattern_list_url = reverse(
            "pattern-list-create"
        )

        # 테스트용 Pattern 데이터
        self.pattern_data = {
            "title": "테스트 도안",
            "width": 2,
            "height": 2,
            "is_public": False,
            "pattern_data": {
                "width": 2,
                "height": 2,
                "palette": [
                    {
                        "id": 0,
                        "name": "Black",
                        "hex": "#000000",
                    },
                    {
                        "id": 1,
                        "name": "White",
                        "hex": "#FFFFFF",
                    },
                ],
                "pixels": [
                    [0, 1],
                    [1, 0],
                ],
            },
        }

    def create_pattern(self, user=None, title=None, is_public=False):
        """
        테스트용 Pattern을 생성한다.

        별도의 테스트에서 반복해서 사용하는
        Pattern 생성 과정을 하나의 함수로 분리했다.
        """

        if user is None:
            user = self.user1

        data = self.pattern_data.copy()
        data["is_public"] = is_public

        self.client.force_authenticate(user=user)

        response = self.client.post(
            self.pattern_list_url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        return response.data

    # ==================================================
    # Pattern 생성
    # ==================================================

    def test_create_pattern(self):
        """
        로그인한 사용자가 Pattern을 생성할 수 있는지 확인한다.
        """

        self.client.force_authenticate(user=self.user1)

        response = self.client.post(
            self.pattern_list_url,
            self.pattern_data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            response.data["title"],
            "테스트 도안",
        )

        self.assertEqual(
            response.data["width"],
            2,
        )

        self.assertEqual(
            response.data["height"],
            2,
        )

    # ==================================================
    # Pattern 목록 조회
    # ==================================================

    def test_list_only_own_patterns(self):
        """
        로그인한 사용자가 자신의 Pattern만 조회할 수 있는지 확인한다.
        """

        # user1 Pattern 생성
        self.create_pattern(user=self.user1)

        # user2 Pattern 생성
        self.create_pattern(user=self.user2)

        # user1로 로그인
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(
            self.pattern_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        # user1의 Pattern만 반환되는지 확인
        self.assertEqual(
            len(response.data),
            1,
        )

        self.assertEqual(
            response.data[0]["title"],
            "테스트 도안",
        )

    # ==================================================
    # Pattern 상세 조회
    # ==================================================

    def test_retrieve_own_pattern(self):
        """
        로그인한 사용자가 자신의 Pattern을 상세 조회할 수 있는지 확인한다.
        """

        pattern = self.create_pattern(
            user=self.user1
        )

        pattern_url = reverse(
            "pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        response = self.client.get(
            pattern_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["id"],
            pattern["id"],
        )

    # ==================================================
    # Pattern 수정
    # ==================================================

    def test_update_own_pattern(self):
        """
        로그인한 사용자가 자신의 Pattern을 수정할 수 있는지 확인한다.
        """

        pattern = self.create_pattern(
            user=self.user1
        )

        pattern_url = reverse(
            "pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        update_data = {
            "title": "수정된 도안",
        }

        response = self.client.patch(
            pattern_url,
            update_data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["title"],
            "수정된 도안",
        )

    # ==================================================
    # Pattern 삭제
    # ==================================================

    def test_delete_own_pattern(self):
        """
        로그인한 사용자가 자신의 Pattern을 삭제할 수 있는지 확인한다.
        """

        pattern = self.create_pattern(
            user=self.user1
        )

        pattern_url = reverse(
            "pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        response = self.client.delete(
            pattern_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        # 삭제 후 다시 조회했을 때 존재하지 않는지 확인
        response = self.client.get(
            pattern_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    # ==================================================
    # 다른 사용자 Pattern 접근 차단
    # ==================================================

    def test_cannot_access_other_users_pattern(self):
        """
        다른 사용자의 Pattern을 조회하거나 수정할 수 없는지 확인한다.
        """

        # user1이 Pattern 생성
        pattern = self.create_pattern(
            user=self.user1
        )

        pattern_url = reverse(
            "pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        # user2로 로그인
        self.client.force_authenticate(
            user=self.user2
        )

        # 상세 조회 차단 확인
        response = self.client.get(
            pattern_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        # 수정 차단 확인
        response = self.client.patch(
            pattern_url,
            {"title": "다른 사용자 수정"},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        # 삭제 차단 확인
        response = self.client.delete(
            pattern_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    # ==================================================
    # 비로그인 사용자 접근 차단
    # ==================================================

    def test_unauthenticated_user_cannot_access_patterns(self):
        """
        로그인하지 않은 사용자가 개인 Pattern API에
        접근할 수 없는지 확인한다.
        """

        # 인증 정보를 제거한다.
        self.client.force_authenticate(
            user=None
        )

        response = self.client.get(
            self.pattern_list_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    # ==================================================
    # Public Pattern 목록
    # ==================================================

    def test_public_pattern_list(self):
        """
        로그인하지 않은 사용자도 Public Pattern 목록을
        조회할 수 있는지 확인한다.
        """

        # Public Pattern 생성
        self.create_pattern(
            user=self.user1,
            is_public=True,
        )

        # Private Pattern 생성
        self.create_pattern(
            user=self.user1,
            is_public=False,
        )

        # 인증 정보 제거
        self.client.force_authenticate(
            user=None
        )

        public_url = reverse(
            "public-pattern-list"
        )

        response = self.client.get(
            public_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        # Public Pattern만 반환되는지 확인
        self.assertEqual(
            len(response.data),
            1,
        )

        self.assertTrue(
            response.data[0]["is_public"]
        )

    # ==================================================
    # Public Pattern 상세 조회
    # ==================================================

    def test_public_pattern_detail(self):
        """
        Public Pattern은 로그인하지 않아도
        상세 조회할 수 있는지 확인한다.
        """

        pattern = self.create_pattern(
            user=self.user1,
            is_public=True,
        )

        # 인증 정보 제거
        self.client.force_authenticate(
            user=None
        )

        public_url = reverse(
            "public-pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        response = self.client.get(
            public_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["id"],
            pattern["id"],
        )

        self.assertTrue(
            response.data["is_public"]
        )

    # ==================================================
    # Private Pattern 보호
    # ==================================================

    def test_private_pattern_not_available_public_api(self):
        """
        Private Pattern이 Public API를 통해
        노출되지 않는지 확인한다.
        """

        pattern = self.create_pattern(
            user=self.user1,
            is_public=False,
        )

        # 인증 정보 제거
        self.client.force_authenticate(
            user=None
        )

        public_url = reverse(
            "public-pattern-detail",
            kwargs={"pk": pattern["id"]},
        )

        response = self.client.get(
            public_url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_create_pattern_with_invalid_width(self):
        """
        width가 0이면 Pattern 생성이 실패해야 한다.
        """

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "잘못된 Width",
            "width": 0,
            "height": 2,
            "is_public": False,
            "pattern_data": {
                "width": 0,
                "height": 2,
                "palette": [],
                "pixels": [
                    [],
                    [],
                ],
            },
        }

        response = self.client.post(
            reverse("pattern-list-create"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 400)


    def test_create_pattern_with_invalid_height(self):
        """
        height가 0이면 Pattern 생성이 실패해야 한다.
        """

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "잘못된 Height",
            "width": 2,
            "height": 0,
            "is_public": False,
            "pattern_data": {
                "width": 2,
                "height": 0,
                "palette": [],
                "pixels": [],
            },
        }

        response = self.client.post(
            reverse("pattern-list-create"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 400)


    def test_create_pattern_without_pattern_data(self):
        """
        pattern_data가 없으면 Pattern 생성이 실패해야 한다.
        """

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "Pattern Data 없음",
            "width": 2,
            "height": 2,
            "is_public": False,
        }

        response = self.client.post(
            reverse("pattern-list-create"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 400)


    def test_create_pattern_with_mismatched_dimensions(self):
        """
        Pattern의 width와 pattern_data.width가
        다르면 생성이 실패해야 한다.
        """

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "크기 불일치",
            "width": 3,
            "height": 2,
            "is_public": False,
            "pattern_data": {
                "width": 2,
                "height": 2,
                "palette": [],
                "pixels": [
                    [0, 1],
                    [1, 0],
                ],
            },
        }

        response = self.client.post(
            reverse("pattern-list-create"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 400)


    def test_create_pattern_with_invalid_pixels_size(self):
        """
        pixels의 행/열 크기가 Pattern의
        width / height와 다르면 생성이 실패해야 한다.
        """

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "Pixels 크기 오류",
            "width": 2,
            "height": 2,
            "is_public": False,
            "pattern_data": {
                "width": 2,
                "height": 2,
                "palette": [],
                "pixels": [
                    [0, 1],
                ],
            },
        }

        response = self.client.post(
            reverse("pattern-list-create"),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 400)


    def test_cannot_update_other_users_pattern(self):
        """
        다른 사용자의 Pattern은 수정할 수 없어야 한다.
        """

        pattern = self.create_pattern(
            self.user2,
            title="다른 사용자 Pattern",
        )

        self.client.force_authenticate(user=self.user1)

        data = {
            "title": "수정 시도",
        }

        response = self.client.patch(
            reverse(
                "pattern-detail",
                kwargs={"pk": pattern["id"]},
            ),
            data,
            format="json",
        )

        self.assertEqual(response.status_code, 404)


    def test_cannot_delete_other_users_pattern(self):
        """
        다른 사용자의 Pattern은 삭제할 수 없어야 한다.
        """

        pattern = self.create_pattern(
            self.user2,
            title="다른 사용자 Pattern",
        )

        self.client.force_authenticate(user=self.user1)

        response = self.client.delete(
            reverse(
                "pattern-detail",
                kwargs={"pk": pattern["id"]},
            )
        )

        self.assertEqual(response.status_code, 404)


    def test_other_user_can_view_public_pattern(self):
        """
        다른 사용자가 공개된 Pattern을 조회할 수 있어야 한다.
        """

        pattern = self.create_pattern(
            self.user2,
            title="공개 Pattern",
            is_public=True,
        )

        # 로그인하지 않은 상태에서도 Public API 접근 가능
        self.client.force_authenticate(user=None)

        response = self.client.get(
            reverse(
                "public-pattern-detail",
                kwargs={"pk": pattern["id"]},
            )
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], pattern["id"])
        self.assertTrue(response.data["is_public"])