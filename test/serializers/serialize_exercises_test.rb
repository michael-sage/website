require 'test_helper'

class SerializeExercisesTest < ActiveSupport::TestCase
  test "without user track" do
    concept_exercise = create :concept_exercise
    practice_exercise = create :practice_exercise

    expected = [{
      slug: concept_exercise.slug,
      title: concept_exercise.title,
      icon_url: concept_exercise.icon_url,
      blurb: concept_exercise.blurb,
      difficulty: "easy",
      is_unlocked: nil,
      is_recommended: nil,
      is_completed: nil,
      links: {}
    }, {
      slug: practice_exercise.slug,
      title: practice_exercise.title,
      icon_url: practice_exercise.icon_url,
      blurb: practice_exercise.blurb,
      difficulty: "easy",
      is_unlocked: nil,
      is_recommended: nil,
      is_completed: nil,
      links: {}
    }]

    assert_equal expected, SerializeExercises.(
      [concept_exercise, practice_exercise]
    )
  end

  test "with user track" do
    user = create :user
    track = create :track
    user_track = create :user_track, user: user, track: track
    concept_exercise = create :concept_exercise, track: track
    practice_exercise = create :practice_exercise, track: track
    create :exercise_prerequisite, exercise: practice_exercise

    expected = [{
      slug: concept_exercise.slug,
      title: concept_exercise.title,
      icon_url: concept_exercise.icon_url,
      blurb: concept_exercise.blurb,
      difficulty: "easy",
      is_unlocked: true,
      is_recommended: false,
      is_completed: false,
      links: {
        self: Exercism::Routes.track_exercise_path(track, concept_exercise)
      }
    }, {
      slug: practice_exercise.slug,
      title: practice_exercise.title,
      icon_url: practice_exercise.icon_url,
      blurb: practice_exercise.blurb,
      difficulty: "easy",
      is_unlocked: false,
      is_recommended: false,
      is_completed: false,
      links: {}
    }]

    assert_equal expected, SerializeExercises.(
      [concept_exercise, practice_exercise],
      user_track: user_track
    )
  end
end